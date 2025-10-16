"use client";

import { MenuItem } from "@/components/ui/buttons";
import ProfileHeader from "@/components/ProfileHeader";
import { features } from "@/utils/string";

export default function ExpensesPage() {

  return (
    <div className="container">
      {/* Header */}
      <ProfileHeader title="Expenses" />

      {/* Content */}
      <div className="w-full p-4">
        <div className="w-full p-4 text-stone-400 text-sm">
          Track all payment services summary
        </div>

        <div className="flex flex-col divide-y divide-stone-200">
          {features.map((item, idx) => {
            if (item.purchaseable) {
              const Icon = item.icon;
              return (
                <MenuItem
                  key={idx}
                  icon={<Icon size={20} color="#21A29D" />}
                  label={item.title}
                  showBorder={false}
                  type="data"
                />
              );
            }
            return (<div key={idx}></div>);
          })}
        </div>
      </div>

    </div>
  );
}
