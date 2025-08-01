import React from "react";

// Dummy initialRows — you can pass this as props or import from data
const initialRows = [
  {
    id: 1,
    nameUz: "Куртка қишки",
    nameRu: "Зимняя куртка",
    type: "униформа",
    price: 120000,
    unit: "шт",
    sizes: "S, M, L, XL",
    status: true,
  },
  {
    id: 2,
    nameUz: "Туфли",
    nameRu: "Туфли",
    type: "обувь",
    price: 90000,
    unit: "пара",
    sizes: "39, 40, 41, 42",
    status: false,
  },
  // Add more rows if needed
];

const ProductStats = () => {
  const stats = [
    {
      label: t("Жами маҳсулотлар"),
      value: initialRows.length,
      icon: "/icons/box.svg",
      borderColor: "border-blue-500",
    },
    {
      label: t("Фаол маҳсулотлар"),
      value: initialRows.filter((item) => item.status).length,
      icon: "/icons/check.svg",
      borderColor: "border-green-500",
    },
    {
      label: t("нофаол маҳсулотлар"),
      value: initialRows.filter((item) => !item.status).length,
      icon: "/icons/cross.svg",
      borderColor: "border-red-500",
    },
    {
      label: t("Уникал турлар"),
      value: new Set(initialRows.map((item) => item.type)).size,
      icon: "/icons/category.svg",
      borderColor: "border-yellow-500",
    },
    {
      label: "Ўртача нарх",
      value:
        Math.round(
          initialRows.reduce((sum, item) => sum + item.price, 0) /
            initialRows.length
        ) + " сўм",
      icon: "/icons/money.svg",
      borderColor: "border-purple-500",
    },
    {
      label: "Жами ўлчамлар",
      value: initialRows.reduce(
        (sum, item) => sum + item.sizes.split(",").length,
        0
      ),
      icon: "/icons/sizes.svg",
      borderColor: "border-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`flex justify-between flex-col bg-white rounded-xl px-4 py-3 border-l-4 ${stat.borderColor}`}
          style={{ boxShadow: "2px 0 16px 2px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center gap-2 justify-between">
            <p className="text-[#A2A2A2] text-md">{stat.label}</p>
            <div>
              <img className="w-10" src={stat.icon} alt="" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;
