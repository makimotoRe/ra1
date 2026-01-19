import DefaultSortableDashboard from "../components/DefaultSortableDashboard";
import { ItemsProvider } from "../../../shared/hooks/useItems";
import { Bar, Line } from "react-chartjs-2";
import { Title } from "react-admin";
import { useEffect } from "react";

//Dashboard画面 (dataはサンプル)
export const DefaultDashboard = () => {

  return (
    <>
      <Title title="Dashboard" />
      <ItemsProvider>
        <DefaultSortableDashboard>
          {(item) => (
            <>
              {item.graph ? (
                <div>
                  {item.graph.datasets[0].label === "Monthly Sales" && (
                    <Bar data={item.graph} />
                  )}
                  {item.graph.datasets[0].label === "Gender Ratio" && (
                    <Bar data={item.graph} />
                  )}
                  {item.graph.datasets[0].label === "Recent Activity" && (
                    <Line data={item.graph} />
                  )}
                </div>
              ) : null}
            </>
          )}
        </DefaultSortableDashboard>
      </ItemsProvider>
    </>
  );
};
