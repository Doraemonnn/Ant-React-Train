const Menu = [
  {
    label: "实时监视",
    pathname: "/home",
    icon: "home"
  },
  {
    label: "健康管理",
    pathname: "",
    icon: "coffee",
    children: [
      {
        label: "健康档案",
        pathname: "/health-records",
        icon: "exception"
      },
      {
        label: "历史数据查询",
        pathname: "",
        icon: "exception",
        children: [
          {
            label: "历史故障",
            pathname: "/history-fault",
            icon: "notification"
          },
          {
            label: "历史寿命",
            pathname: "/history-life",
            icon: "bulb"
          }
        ]
      }
    ]
  },
  {
    label: "版本管理",
    pathname: "/version",
    icon: "trophy"
  },
  {
    label: "权限控制",
    pathname: "/authorized",
    icon: "user"
  }
];

export default Menu;
