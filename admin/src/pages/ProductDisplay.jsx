import { Eye, Pencil, Trash2 } from "lucide-react";
import React from "react";

function ProductDisplay() {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">All Bikes</h2>
      <div className="w-full overflow-x-auto">
        <table className="table min-w-[800px]">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Model</th>
              <th>Condition</th>
              <th>CC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Bike Image"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Pulsar Ns</div>
                    <div className="text-sm opacity-50">Dirt</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap">Zemlak, Daniel and Leannon</td>
              <td>New</td>
              <td>150</td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-ghost btn-xs">
                    <Pencil size={20} />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <Eye size={20} />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductDisplay;
