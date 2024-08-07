import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HeaderWrapper } from "./components/header";
import { RightToolbar } from "../partials/layout/RightToolbar";
import { ScrollTop } from "./components/scroll-top";
import { FooterWrapper } from "./components/footer";
import { Sidebar } from "./components/sidebar";
import {
  ActivityDrawer,
  DrawerMessenger,
  InviteUsers,
  UpgradePlan,
} from "../partials";
import { PageDataProvider } from "./core";
import { reInitMenu } from "../helpers";
import { useSocket, useSocketContext } from "../../hooks/useSocket";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNotification } from "../../redux/slice/notificationSlice";
import baseApi from "../../features/baseApi";
import { useSocketEvent } from "../../hooks/useSocketEvent";

const MasterLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    reInitMenu();
  }, [location.key]);

  const socket = useSocketContext();

  const handleTicketResponse = (ticket: any) => {
    console.log("Ticket Response Event:", ticket);
    toast("New response on client ticket");
    dispatch(
      baseApi.util.invalidateTags([
        { type: "TicketResponse", id: `LIST-${ticket?._id}` },
      ])
    );
    dispatch(addNotification(ticket._id));
  };

  const handleNewTicket = (ticket: any) => {
    console.log(ticket);
    toast("A new ticket has been submitted");
    dispatch(baseApi.util.invalidateTags([{ type: "Ticket", id: "LIST" }]));
    dispatch(addNotification(ticket._id));
  };

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.emit("join", "support");

  //   socket.on("new-ticket-response", handleTicketResponse);
  //   socket.on("new-ticket", handleNewTicket);

  //   return () => {
  //     socket.off("new-ticket-response", handleTicketResponse);
  //     socket.off("new-ticket", handleNewTicket);
  //   };
  // }, [socket, handleTicketResponse, handleNewTicket]);

  useSocketEvent<{ message: string }>("new-ticket-response", (data) =>
    handleTicketResponse(data)
  );
  useSocketEvent<{ message: string }>("new-ticket", (data) =>
    handleNewTicket(data)
  );

  return (
    <PageDataProvider>
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div
          className="app-page flex-column flex-column-fluid"
          id="kt_app_page"
        >
          <HeaderWrapper />
          <div
            className="app-wrapper flex-column flex-row-fluid"
            id="kt_app_wrapper"
          >
            <Sidebar />
            <div
              className="app-main flex-column flex-row-fluid"
              id="kt_app_main"
            >
              <div className="d-flex flex-column flex-column-fluid">
                <Outlet />
              </div>
              <FooterWrapper />
            </div>
          </div>
        </div>
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawer />
      {/* <RightToolbar /> */}
      <DrawerMessenger />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  );
};

export { MasterLayout };
