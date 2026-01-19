import jsonServerProvider from "ra-data-json-server";
import { DeleteParams } from "react-admin";
import { DeleteManyParams } from "react-admin";

const dataProvider = jsonServerProvider(import.meta.env.VITE_JSON_SERVER_URL);

const CustomDataProvider = {
  ...dataProvider,
  getList: async (resource: any, params: any) => {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const data = await response.json();
    // console.log(data.results)

    const filter = params.filter || {};
    const transformedData = data.results
      .filter((item: any) => {
        // フィルタリング条件に基づいてデータをフィルタリング
        let isValid = true;
        if (filter.gender) {
          isValid = isValid && item.gender === filter.gender;
        }
        // 他のフィルタ条件を追加する場合はここに追加
        return isValid;
      })
      .map((item: any) => {
        return {
          id: item.login.uuid,
          name: item.name.first + " " + item.name.last, // フルネームを作成
          gender: item.gender,
          email: item.email,
          phone: item.phone,
          location: item.location.city + ", " + item.location.country, // 場所情報をまとめる
        };
      });

    // console.log('Transformed data:', transformedData);
    return {
      gender: transformedData.length,
      data: transformedData,
      total: data.results.length,
    };
  },
  getOne: async (resource: any, params: { id: any }) => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return {
      data: { id: data.results[0].login.uuid, ...data.results[0] },
    };
  },
  getMany: async (resource: any, params: { ids: any[] }) => {
    const promises = params.ids.map((id: any) =>
      fetch("https://randomuser.me/api/")
    );
    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map((res) => res.json()));
    return {
      data: data.map((item, index) => ({
        id: item.results[0].login.uuid,
        ...item.results[0],
      })),
    };
  },
  getManyReference: async (resource: any, params: any) => {
    // ここではシンプルな例としてgetListを再利用します
    return CustomDataProvider.getList(resource, params);
  },
  update: async (resource: any, params: { data: any }) => {
    // randomuser.meはPOST/PUTをサポートしていないので、ここでは例としてparams.dataをそのまま返します
    return { data: params.data };
  },
  updateMany: async (resource: any, params: { ids: any }) => {
    // 同様に、例としてparams.dataをそのまま返します
    return { data: params.ids };
  },
  create: async (resource: any, params: { data: any }) => {
    // 同様に、例としてparams.dataをそのまま返します
    return { data: { ...params.data, id: new Date().getTime() } };
  },
  delete: async (resource: string, params: DeleteParams<any>) => {
    // デフォルトのdataProviderのdeleteメソッドを呼び出す
    const response = await dataProvider.delete(resource, params);
    return {
      data: { ...params.previousData },
    };
  },
  deleteMany: async (resource: string, params: DeleteManyParams<any>) => {
    // デフォルトのdataProviderのdeleteManyメソッドを呼び出す
    const response = await dataProvider.deleteMany(resource, params);
    return { data: params.ids };
  },
};

export default CustomDataProvider;
