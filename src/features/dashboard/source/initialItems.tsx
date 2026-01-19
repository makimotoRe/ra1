import {
  ChartData,
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement
);

//初期サンプルデータ
export const initialItems: Item[] = [
  {
    id: "1",
    title: "Welcome",
    content: "Lorem ipsum sic dolor amet...",
    photo: "none",
    isVisible: true,
  },
  {
    id: "2",
    title: "Total Users",
    content: "1,234 Total number of users registered.",
    isVisible: true,
  },
  {
    id: "3",
    title: "Monthly Sales",
    content: "$12,345 Sales made this month.",
    isVisible: true,
    graph: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Monthly Sales",
          data: [3000, 5000, 4000, 7000, 6000],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
  },
  {
    id: "4",
    title: "Gender ratio",
    content: "56 Orders that are pending shipment.",
    isVisible: true,
    graph: {
      labels: ["Male", "Female", "Other"],
      datasets: [
        {
          label: "Gender Ratio",
          data: [60, 30, 10],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  },
  {
    id: "5",
    title: "Recent",
    content:
      "- User John Doe registered\n- Order #1234 was placed\n- Product XYZ was reviewed",
    isVisible: true,
  },
  {
    id: "6",
    title: "Recent Activity",
    content:
      "- User John Doe registered\n- Order #1234 was placed\n- Product XYZ was reviewed",
    isVisible: true,
    graph: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Recent Activity",
          data: [10, 20, 15, 25],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
  },
  // {
  //   id: "9",
  //   title: "Recent",
  //   content: "- User John Doe registered\n- Order #1234 was placed\n- Product XYZ was reviewed",
  //   isVisible: true,
  // },
  // {
  //   id: "7",
  //   title: "Recent",
  //   content: "- User John Doe registered\n- Order #1234 was placed\n- Product XYZ was reviewed",
  //   isVisible: true,
  // },
  // {
  //   id: "8",
  //   title: "Recent",
  //   content: "- User John Doe registered\n- Order #1234 was placed\n- Product XYZ was reviewed",
  //   isVisible: true,
  // },
];

export interface Item {
  id: string;
  title: string;
  content: string;
  isVisible?: boolean;
  photo?: string;
  graph?: ChartData<"bar"> | ChartData<"line"> | any | any[];
}
