import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Apps
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/users"
        title="Users"
        fontIcon="bi-chat-left"
        icon="people"
      >
        <SidebarMenuItem
          to="/users/organizations"
          title="Organizations"
          hasBullet={true}
        />
        <SidebarMenuItem to="/users/beats" title="Beats" hasBullet={true} />
        <SidebarMenuItem to="/users/guards" title="Guards" hasBullet={true} />
        <SidebarMenuItem
          to="/users/subcriptions"
          title="Subcriptions"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
    </>
  );
};

export { SidebarMenuMain };
