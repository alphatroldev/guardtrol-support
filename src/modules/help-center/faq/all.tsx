import React, { useEffect, useState } from "react";
import CreateFaqCategory from "./createFaqCategory";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import CreateFaq from "./createFaq";
import { KTIcon } from "../../../_metronic/helpers";
import { Spinner } from "react-bootstrap";
import { IFaq } from "../../../types/faq";
import withReactContent from "sweetalert2-react-content";
import * as swal from "sweetalert2";
import { IFaqCategories } from "../../../types/faq-categories";
import { useDeleteFaqMutation, useGetFaqsQuery } from "../../../features/faq";
import { useGetFaqCategoriesQuery } from "../../../features/faq-categories";
type Props = {
  setFAQ: Function;
  isOpenFaqForm: boolean;
  setIsOpenFaqForm: Function;
  FAQ?: IFaq | null;
};
const MySwal = withReactContent(swal.default);

const HelpCenterFAQ = ({ setFAQ, setIsOpenFaqForm }: Props) => {
  const [category, setCategory] = useState<"new" | IFaqCategories>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [IsLoading, setIsLoading] = useState<boolean>(false);

  const [faqCategories, setFaqCategories] = useState<Array<IFaqCategories>>();
  const [faqs, setFaqs] = useState<Array<IFaq>>();

  const { data: faqsApiResponse, refetch: refetchFaqs } = useGetFaqsQuery({});
  const { data: faqsApiCategoriesResponse, refetch: refetchFaqCategories } =
    useGetFaqCategoriesQuery({});
  const [deleteFaq] = useDeleteFaqMutation();

  const handleCloseFaqForm = () => {
    setIsOpenFaqForm(false);
  };
  const handleDelete = (faq: IFaq) => {
    MySwal.fire({
      title: "Are you sure, you want to delete this document?",
      text: `Document title: ${faq.question}`,
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Yes Delete!",
      showCancelButton: true,
      heightAuto: false,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
    }).then((result: any) => {
      if (result.isConfirmed) {
        deleteFaq(faq._id || "").then((res) => {
          if (res?.data) {
            // refreshProject()
            MySwal.fire({
              title: "Deleted!",
              text: "Faq has been deleted.",
              icon: "success",
            });
          }
          // else {
          //   MySwal.fire({
          //     title: 'Error',
          //     text: res?.error,
          //     icon: 'error',
          //     confirmButtonText: 'Close!',
          //     customClass: {
          //       confirmButton: 'btn btn-danger',
          //     },
          //   })
          // }
        });
      }
    });
  };

  const groupedFaq = faqs?.reduce((result: any, current) => {
    const category = current.category;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(current);
    return result;
  }, {});

  return (
    <>
      <div
        className="row gy-6 mt-5"
        style={{ maxHeight: "400px", overflowY: "scroll" }}
      >
        {IsLoading && <Spinner animation="grow" />}
        {faqsApiResponse?.total !== 0 ? (
          faqsApiResponse?.data?.map((groupedFaq) => {
            return (
              <div className="col-6 " key={groupedFaq.category._id}>
                <div
                  key={groupedFaq.category._id}
                  className="card mb-15 h-100 card-stretch flex-grow"
                >
                  <div className="m-0 card-body">
                    <h3 className="text-gray-800 w-bolder mb-4">
                      {groupedFaq.category.title}
                    </h3>
                    {groupedFaq.faqs ? (
                      groupedFaq.faqs?.map((faq: IFaq) => (
                        <div key={faq._id}>
                          <div
                            style={{ position: "relative" }}
                            key={faq._id + "question"}
                            className="d-flex align-items-center collapsible py-3 toggle mb-0 collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faq_${faq._id}`}
                            aria-expanded="false"
                          >
                            <div className="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                              <i className="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                              <i className="ki-duotone ki-plus-square toggle-off fs-1">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                              </i>
                            </div>
                            <h4 className="text-gray-700 fw-bold cursor-pointer mb-0">
                              {faq.question}
                            </h4>
                            <div>
                              {currentUser?.role === "superadmin" && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsOpenFaqForm(true);
                                      setFAQ(faq);
                                    }}
                                    className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary mb-2"
                                    data-kt-menu-trigger="click"
                                    data-kt-menu-placement="bottom-end"
                                    data-kt-menu-flip="top-end"
                                    title="Delete"
                                    style={{
                                      position: "absolute",
                                      right: "50px",
                                      top: "10px",
                                    }}
                                  >
                                    <KTIcon
                                      iconName="pencil"
                                      className="fs-2"
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(faq)}
                                    className="btn btn-sm btn-icon btn-color-danger btn-active-light-danger mb-2"
                                    data-kt-menu-trigger="click"
                                    data-kt-menu-placement="bottom-end"
                                    data-kt-menu-flip="top-end"
                                    title="Delete"
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "10px",
                                    }}
                                  >
                                    <KTIcon iconName="trash" className="fs-2" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                          <div
                            key={faq._id + "answer"}
                            id={`faq_${faq._id}`}
                            className="fs-6 ms-1 collapse"
                          >
                            <div className="mb-4 text-gray-600 fw-semibold fs-6 ps-10">
                              {faq.answer}
                            </div>
                            <div className="separator separator-dashed"></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h4 className=" text-muted cursor-pointer mb-0 ">
                        No Faq
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mb-4">
            <span className="text-muted fw-semibold fs-5">No Faq</span>
          </div>
        )}
      </div>
      {/* {faqs &&
                        faqs.map((faq) => (
                          <div key={faq._id} className='m-0'>
                            <div
                              style={{position: 'relative'}}
                              key={faq._id + 'question'}
                              className='d-flex align-items-center collapsible py-3 toggle mb-0 collapsed'
                              data-bs-toggle='collapse'
                              data-bs-target={`#faq_${faq._id}`}
                              aria-expanded='false'
                            >
                              <div className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'>
                                <i className='ki-duotone ki-minus-square toggle-on text-primary fs-1'>
                                  <span className='path1'></span>
                                  <span className='path2'></span>
                                </i>
                                <i className='ki-duotone ki-plus-square toggle-off fs-1'>
                                  <span className='path1'></span>
                                  <span className='path2'></span>
                                  <span className='path3'></span>
                                </i>
                              </div>
                              <h4 className='text-gray-700 fw-bold cursor-pointer mb-0'>
                                {faq.question}
                              </h4>
                              <div>
                                <button
                                  type='button'
                                  onClick={() => setFAQ(faq)}
                                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary mb-2'
                                  data-kt-menu-trigger='click'
                                  data-kt-menu-placement='bottom-end'
                                  data-kt-menu-flip='top-end'
                                  title='Delete'
                                  style={{
                                    position: 'absolute',
                                    right: '50px',
                                    top: '10px',
                                  }}
                                >
                                  <KTIcon iconName='pencil' className='fs-2' />
                                </button>
                                <button
                                  type='button'
                                  onClick={() => handleDelete(faq)}
                                  className='btn btn-sm btn-icon btn-color-danger btn-active-light-danger mb-2'
                                  data-kt-menu-trigger='click'
                                  data-kt-menu-placement='bottom-end'
                                  data-kt-menu-flip='top-end'
                                  title='Delete'
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '10px',
                                  }}
                                >
                                  <KTIcon iconName='trash' className='fs-2' />
                                </button>
                              </div>
                            </div>{' '}
                            <div
                              key={faq._id + 'answer'}
                              id={`faq_${faq._id}`}
                              className='fs-6 ms-1 collapse'
                            >
                              <div className='mb-4 text-gray-600 fw-semibold fs-6 ps-10'>
                                {faq.answer}
                              </div>
                            </div>
                            <div className='separator separator-dashed'></div>
                          </div>
                        ))} */}
    </>
  );
};

export default HelpCenterFAQ;
