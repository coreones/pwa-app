"use client";

import { MenuItem } from "@/components/ui/buttons";
import {
  Smartphone,
  ChartNoAxesColumn,
  Lightbulb,
  Tv,
  Plane,
  Volleyball,
  Wifi,
  NotepadText,
  Ticket,
  Bus,
  Star,
} from "lucide-react";
import ProfileHeader from "@/components/ProfileHeader";

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
          <MenuItem
            icon={<Smartphone size={20} color="#21A29D" />}
            label="Airtime"
            showBorder={false}
            type="data"
          />
          <MenuItem
            icon={<Wifi size={20} color="#21A29D" />}
            label="Data"
            showBorder={false}
            type="data"
          />
          <MenuItem
            icon={<Lightbulb size={20} color="#21A29D" />}
            label="Electricity"
            showBorder={false}
            type="data"
          />
          <MenuItem
            icon={<Tv size={20} color="#21A29D" />}
            label="Cable TV"
            showBorder={false}
            type="data"
          />
          <MenuItem
            icon={<Star size={20} color="#21A29D" />}
            label="Betting"
            showBorder={false}
            type="data"
          />
          <MenuItem
            icon={<Plane size={20} color="#21A29D" />}
            label="Flight Booking"
            showBorder={false}
            type="data"
          />
        </div>
      </div>

    </div>
  );
}
