import React, { useContext, useMemo, useState } from "react";
import SizesContext from "../../../context/SizesContext";

const ManageSizes = () => {
  const { sizes, setSizes } = useContext(SizesContext);

  const categories = useMemo(() => Object.keys(sizes), [sizes]);
  const [category, setCategory] = useState(categories[0] || "");

  const groups = useMemo(() => {
    if (!category) return [];
    const node = sizes[category] || {};
    return Object.keys(node);
  }, [sizes, category]);

  const [group, setGroup] = useState("");

  const items = useMemo(() => {
    if (!category || !group) return [];
    const node = sizes[category]?.[group] || {};
    if (Array.isArray(node)) return [group];
    return Object.keys(node || {});
  }, [sizes, category, group]);

  const [item, setItem] = useState("");

  const currentArray = useMemo(() => {
    if (!category) return [];
    if (!group) return [];
    const groupNode = sizes[category]?.[group];
    if (Array.isArray(groupNode)) {
      return groupNode;
    }
    if (item) {
      const arr = sizes[category]?.[group]?.[item];
      return Array.isArray(arr) ? arr : [];
    }
    return [];
  }, [sizes, category, group, item]);

  const [editText, setEditText] = useState("");

  React.useEffect(() => {
    if (categories.length && !category) setCategory(categories[0]);
  }, [categories, category]);

  React.useEffect(() => {
    if (groups.length) {
      if (!groups.includes(group)) setGroup(groups[0]);
    } else {
      setGroup("");
    }
  }, [groups, group]);

  React.useEffect(() => {
    if (items.length) {
      if (!items.includes(item)) setItem(items[0]);
    } else {
      setItem("");
    }
  }, [items, item]);

  React.useEffect(() => {
    setEditText(currentArray.join(", "));
  }, [currentArray]);

  const saveChanges = () => {
    if (!category || !group) return alert("Select category and group/item to save.");
    const parsed = editText.split(",").map(s => s.trim()).filter(Boolean);
    setSizes(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[category]) copy[category] = {};
      if (!copy[category][group]) copy[category][group] = {};
      if (item) {
        copy[category][group][item] = parsed;
      } else {
        copy[category][group] = parsed;
      }
      return copy;
    });
    alert("Sizes saved locally.");
  };

  const addSingleSize = (val) => {
    if (!val) return;
    const next = Array.from(new Set([...currentArray, val]));
    setEditText(next.join(", "));
  };

  const removeSize = (val) => {
    const next = currentArray.filter(s => s !== val);
    setEditText(next.join(", "));
  };

  const resetToDefaults = () => {
    if (!category) return;
    setSizes(JSON.parse(JSON.stringify(require("../../../Utils/size").sizeGroup)));
    alert("Reset to default sizes from `Utils/size.js`.\nReload page if things look inconsistent.");
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-900 dark:text-white mb-4">Manage Sizes</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded w-full">
              {categories.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Group (e.g., Men/Women)</label>
            <select value={group} onChange={e => setGroup(e.target.value)} className="border p-2 rounded w-full">
              <option value="">-- select --</option>
              {groups.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Item (optional)</label>
            <select value={item} onChange={e => setItem(e.target.value)} className="border p-2 rounded w-full">
              <option value="">(group array)</option>
              {items.map(it => <option key={it} value={it}>{it}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium dark:text-white">Sizes (comma-separated)</label>
          <textarea rows={4} value={editText} onChange={e => setEditText(e.target.value)} className="border p-2 rounded w-full" />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input id="singleSize" placeholder="Add single size (e.g. XL)" className="border p-2 rounded flex-1" />
          <button onClick={() => { const el = document.getElementById('singleSize'); addSingleSize(el.value); el.value=''; }} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
          <button onClick={saveChanges} className="px-3 py-2 bg-green-600 text-white rounded">Save</button>
          <button onClick={resetToDefaults} className="px-3 py-2 bg-red-600 text-white rounded">Reset Defaults</button>
        </div>

        {/* <div className="mb-6">
          <h2 className="font-semibold mb-2 dark:text-white">Current Sizes Preview</h2>
          <div className="flex flex-wrap gap-2">
            {currentArray.length > 0 ? currentArray.map(s => (
              <span key={s} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span className="text-sm">{s}</span>
                <button onClick={() => removeSize(s)} className="text-red-500 text-xs">×</button>
              </span>
            )) : <p className="text-sm text-gray-500">No sizes defined for the selected path.</p>}
          </div>
        </div> */}

        <div className="mt-6">
          <h3 className="font-semibold mb-2 dark:text-white">Category Preview (JSON)</h3>
          <pre className="text-sm bg-gray-50 dark:bg-gray-400 p-3 rounded max-h-72 overflow-auto ">{JSON.stringify(sizes[category] || {}, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default ManageSizes;
