
const updateLocalServer = import.meta.env.UPDATE_LOCAL_SERVER_URL;

export const updateSessionTime = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
        const request = new Request(updateLocalServer, {
            method: 'POST',
            body: auth,
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        fetch(request)
            .then((response) => {
                // console.log(response.json())
                return response.json();
            })
            .then((auth)=>{
                // console.log(auth);
                localStorage.setItem("auth", JSON.stringify(auth));
                return Promise.resolve()})
            .catch((error) => {
                return Promise.reject(error);
            });

    } else {
        return Promise.reject("No auth data to update");
    }
  };