import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LawyerBasicForm from "../components/LawyerRegistration/LawyerBasicForm";
import LawyerDocsForm from "../components/LawyerRegistration/LawyerDocsForm";
// import bgImg from "../assets/images/img1.png";

const LawyerRegistration = ({onDocsSuccess}) => {
  const navigate = useNavigate();
  const [lawyerId, setLawyerId] = useState(null);

  
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="">
            <div className=" border-0 overflow-hidden">
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  // backgroundImage: `url(${bgImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.04,
                  pointerEvents: "none",
                }}
              ></div>
              <div className="card-body p-4 p-md-2">
                <div className="mb-4">
                  <div className="progress mb-3" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: lawyerId ? "100%" : "50%" }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div
                      className={`text-center ${
                        !lawyerId ? "text-primary fw-bold" : "text-muted"
                      }`}
                    >
                      <div
                        className="mx-auto rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-1"
                        style={{ width: "30px", height: "30px" }}
                      >
                        1
                      </div>
                      Basic Information
                    </div>
                    <div
                      className={`text-center ${
                        lawyerId ? "text-primary fw-bold" : "text-muted"
                      }`}
                    >
                      <div
                        className={`mx-auto rounded-circle ${
                          lawyerId ? "bg-primary text-white" : "bg-light"
                        } d-flex align-items-center justify-content-center mb-1`}
                        style={{ width: "30px", height: "30px" }}
                      >
                        2
                      </div>
                      Document Upload
                    </div>
                  </div>
                </div>

                {!lawyerId ? (
                  <LawyerBasicForm onSuccess={(id) => setLawyerId(id)} />
                ) : (
                  <LawyerDocsForm
                    lawyerId={lawyerId}
                    onSuccess={onDocsSuccess}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistration;
