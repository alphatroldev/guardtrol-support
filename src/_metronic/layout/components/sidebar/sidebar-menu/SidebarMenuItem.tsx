import { FC } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { checkIsActive, KTIcon, WithChildren } from "../../../../helpers";
import { useLayout } from "../../../core";

type Props = {
  to: string;
  title: string;
  icon?: string;
  fontIcon?: string;
  hasBullet?: boolean;
  description?: string;
};

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  description,
  hasBullet = false,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);
  const { config } = useLayout();
  const { app } = config;

  return (
    <div style={{ position: "relative" }} className="menu-item">
      <Link
        className={clsx("menu-link without-sub", { active: isActive })}
        to={to}
      >
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === "svg" && (
          <span className="menu-icon">
            {" "}
            <KTIcon iconName={icon} className="fs-2" />
          </span>
        )}
        {fontIcon && app?.sidebar?.default?.menu?.iconType === "font" && (
          <i className={clsx("bi fs-3", fontIcon)}></i>
        )}
        <span className="menu-title">{title}</span>
      </Link>
      {children}
      {description && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "50px",
            position: "absolute",
            top: "15px",
            width: "18px",
            textAlign: "center",
            height: "18px",
            right: "9px",
          }}
        >
          <span
            style={{
              color: "black",
              fontSize: "13px",
            }}
            className="menu-title"
          >
            {description}
          </span>
        </div>
      )}
    </div>
  );
};

export { SidebarMenuItem };
