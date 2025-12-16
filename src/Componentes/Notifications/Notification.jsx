import React from "react";

const dummyNotifications = [
  {
    id: 1,
    type: "product_added",
    title: "Product Added",
    message: "iPhone 15 Pro added successfully!",
     time: new Date().toLocaleString(),
    read: false
  },
  {
    id: 2,
    type: "product_updated",
    title: "Product Updated",
    message: "Price updated for Samsung A34",
     time: new Date().toLocaleString(),
    read: true
  },
  {
    id: 3,
    type: "low_stock",
    title: "Low Stock Alert",
    message: "Only 3 units left of Nike Running Shoes.",
     time: new Date().toLocaleString(),
    read: false
  }
];

const NotificationPage = () => {
  return (
    <div className="p-5 dark:bg-slate-900 min-h-screen">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Notifications</h2>

      {dummyNotifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 mb-3 rounded border ${
            n.read ? "bg-gray-100" : "bg-blue-50 dark:bg-blue-100 border-blue-300"
          }`}
        >
          <h3 className="font-semibold flex items-center gap-2">
            {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
            {n.title}
          </h3>

          <p className="text-gray-700">{n.message}</p>

          <p className="text-xs text-gray-500 mt-1">{n.time}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
