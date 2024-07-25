import React from "react";
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
            {intl.formatMessage({ id: "MENU" })}
          </span>
        </div>
      </div>

      <SidebarMenuItemWithSub
        to="/user-management"
        title={intl.formatMessage({ id: "MENU.USER_MANAGEMENT" })}
        fontIcon="bi-people"
        icon="people"
      >
        <SidebarMenuItem
          to="/user-management/profiles"
          title={intl.formatMessage({ id: "MENU.USER_PROFILES" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/user-management/roles"
          title={intl.formatMessage({ id: "MENU.ROLE_MANAGEMENT" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/user-management/activity-logs"
          title={intl.formatMessage({ id: "MENU.ACTIVITY_LOGS" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/subscription-management"
        title={intl.formatMessage({ id: "MENU.SUBSCRIPTION_MANAGEMENT" })}
        fontIcon="bi-wallet"
        icon="wallet"
      >
        <SidebarMenuItem
          to="/subscription-management/plans"
          title={intl.formatMessage({ id: "MENU.PLAN_MANAGEMENT" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/subscription-management/billing"
          title={intl.formatMessage({ id: "MENU.BILLING" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/subscription-management/status"
          title={intl.formatMessage({ id: "MENU.SUBSCRIPTION_STATUS" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/subscription-management/notifications"
          title={intl.formatMessage({ id: "MENU.NOTIFICATIONS" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/ticketing-system"
        title={intl.formatMessage({ id: "MENU.TICKETING_SYSTEM" })}
        fontIcon="bi-ticket"
        icon="cheque"
      >
        <SidebarMenuItem
          to="/ticketing-system/create"
          title={intl.formatMessage({ id: "MENU.TICKET_CREATION" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/ticketing-system/assignment"
          title={intl.formatMessage({ id: "MENU.TICKET_ASSIGNMENT" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/ticketing-system/status-tracking"
          title={intl.formatMessage({ id: "MENU.TICKET_STATUS_TRACKING" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/ticketing-system/response-management"
          title={intl.formatMessage({ id: "MENU.RESPONSE_MANAGEMENT" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/analytics-reporting"
        title={intl.formatMessage({ id: "MENU.ANALYTICS_REPORTING" })}
        fontIcon="graph-up"
        icon="graph-up"
      >
        <SidebarMenuItem
          to="/analytics-reporting/dashboard"
          title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/analytics-reporting/reports"
          title={intl.formatMessage({ id: "MENU.REPORTS" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/analytics-reporting/insights"
          title={intl.formatMessage({ id: "MENU.INSIGHTS" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/notifications-alerts"
        title={intl.formatMessage({ id: "MENU.NOTIFICATIONS_ALERTS" })}
        fontIcon="bi-bell"
        icon="notification-on"
      >
        <SidebarMenuItem
          to="/notifications-alerts/system-alerts"
          title={intl.formatMessage({ id: "MENU.SYSTEM_ALERTS" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/notifications-alerts/user-notifications"
          title={intl.formatMessage({ id: "MENU.USER_NOTIFICATIONS" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/content-management"
        title={intl.formatMessage({ id: "MENU.CONTENT_MANAGEMENT" })}
        fontIcon="bi-notepad"
        icon="notepad"
      >
        <SidebarMenuItem
          to="/content-management/knowledge-base"
          title={intl.formatMessage({ id: "MENU.KNOWLEDGE_BASE" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/content-management/announcements"
          title={intl.formatMessage({ id: "MENU.ANNOUNCEMENTS" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/security-compliance"
        title={intl.formatMessage({ id: "MENU.SECURITY_COMPLIANCE" })}
        fontIcon="bi-shield-lock"
        icon="shield"
      >
        <SidebarMenuItem
          to="/security-compliance/access-control"
          title={intl.formatMessage({ id: "MENU.ACCESS_CONTROL" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/security-compliance/data-encryption"
          title={intl.formatMessage({ id: "MENU.DATA_ENCRYPTION" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/security-compliance/compliance"
          title={intl.formatMessage({ id: "MENU.COMPLIANCE" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/system-settings"
        title={intl.formatMessage({ id: "MENU.SYSTEM_SETTINGS" })}
        fontIcon="bi-gear"
        icon="gear"
      >
        <SidebarMenuItem
          to="/system-settings/configuration"
          title={intl.formatMessage({ id: "MENU.CONFIGURATION" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/system-settings/integration"
          title={intl.formatMessage({ id: "MENU.INTEGRATION" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/system-settings/backup-recovery"
          title={intl.formatMessage({ id: "MENU.BACKUP_RECOVERY" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/feedback-surveys"
        title={intl.formatMessage({ id: "MENU.FEEDBACK_SURVEYS" })}
        fontIcon="bi-chat-dots"
        icon="message-notif"
      >
        <SidebarMenuItem
          to="/feedback-surveys/user-feedback"
          title={intl.formatMessage({ id: "MENU.USER_FEEDBACK" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/feedback-surveys/surveys"
          title={intl.formatMessage({ id: "MENU.SURVEYS" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/multi-language-support"
        title={intl.formatMessage({ id: "MENU.MULTI_LANGUAGE_SUPPORT" })}
        fontIcon="bi-translate"
        icon="text-align-left"
      >
        <SidebarMenuItem
          to="/multi-language-support/language-settings"
          title={intl.formatMessage({ id: "MENU.LANGUAGE_SETTINGS" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/multi-language-support/localization"
          title={intl.formatMessage({ id: "MENU.LOCALIZATION" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/mobile-app-management"
        title={intl.formatMessage({ id: "MENU.MOBILE_APP_MANAGEMENT" })}
        fontIcon="bi-phone"
        icon="phone"
      >
        <SidebarMenuItem
          to="/mobile-app-management/app-version-control"
          title={intl.formatMessage({ id: "MENU.APP_VERSION_CONTROL" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/mobile-app-management/bug-tracking"
          title={intl.formatMessage({ id: "MENU.BUG_TRACKING" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/integration-tools"
        title={intl.formatMessage({ id: "MENU.INTEGRATION_TOOLS" })}
        fontIcon="bi-plug"
        icon="setting-4"
      >
        <SidebarMenuItem
          to="/integration-tools/crm-integration"
          title={intl.formatMessage({ id: "MENU.CRM_INTEGRATION" })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/integration-tools/marketing-tools"
          title={intl.formatMessage({ id: "MENU.MARKETING_TOOLS" })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
    </>
  );
};

export { SidebarMenuMain };
