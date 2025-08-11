import ThresholdForm from "@/components/threshold";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="px-2 flex flex-col gap-0.5 leading-relaxed">
          <span className="font-medium">SDE Assignment for Mindwebs</span>
          <span className="italic">by Aryesh</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ThresholdForm />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
