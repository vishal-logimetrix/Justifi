import React from "react";
import Select from "react-select";
import {
  Building,
  Map,
  Layers,
  ChevronLeft,
  Loader,
} from "lucide-react";

const LocationSelectionForm = ({
  formData,
  states,
  districts,
  errors,
  statesLoading,
  districtsLoading,
  onStateChange,
  onDistrictChange,
  onSubmit,
  onPrev,
  loading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.state_ids &&
      formData.state_ids.length > 0 &&
      formData.district_ids &&
      formData.district_ids.length > 0 
    );
  };

  // Prepare state options for react-select
const stateOptions = states.map((state) => ({
  value: state.state_id,  // ✅ use state_id
  label: state.name,
}));

  // Prepare district options based on selected states
const districtOptions = districts.map((district) => ({
  value: district.district_id,  // ✅ use district_id
  label: district.name,
}));


  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-primary">
        Select Practice Locations
      </h3>
      <p className="text-muted mb-4">
        Choose the states, districts  where you practice. You can select multiple options for each.
      </p>

      <div className="row g-4">
        {/* State Selection */}
        <div className="col-12">
          <label className="form-label fw-semibold">
            States *
          </label>
          <div className="input-group mb-1">
            <span className="input-group-text bg-white">
              <Building size={18} className="text-muted" />
            </span>
            <div className="flex-grow-1">
              <Select
                isMulti
                options={stateOptions}
                value={
                  formData.state_ids
                    ? stateOptions.filter(option => 
                        formData.state_ids.includes(option.value)
                      )
                    : []
                }
                onChange={onStateChange}
                className={`basic-multi-select ${
                  errors.state_ids ? "is-invalid" : ""
                }`}
                classNamePrefix="select"
                placeholder={statesLoading ? "Loading states..." : "Select States"}
                isLoading={statesLoading}
                isDisabled={statesLoading}
                loadingMessage={() => (
                  <div className="d-flex align-items-center">
                    <Loader className="animate-spin me-2" size={16} />
                    Loading states...
                  </div>
                )}
              />
            </div>
          </div>
          {errors.state_ids && (
            <div className="text-danger small mt-1">
              {errors.state_ids}
            </div>
          )}
        </div>

        {/* District IDs Selection */}
        {formData.state_ids && formData.state_ids.length > 0 && (
          <div className="col-12">
            <label className="form-label fw-semibold">
              Districts *
            </label>
            <div className="input-group mb-1">
              <span className="input-group-text bg-white">
                <Map size={18} className="text-muted" />
              </span>
              <div className="flex-grow-1">
                <Select
                  isMulti
                  options={districtOptions}
                  value={
                    formData.district_ids
                      ? districtOptions.filter(option =>
                          formData.district_ids.includes(option.value)
                        )
                      : []
                  }
                  onChange={onDistrictChange}
                  className={`basic-multi-select ${
                    errors.district_ids ? "is-invalid" : ""
                  }`}
                  classNamePrefix="select"
                  placeholder={districtsLoading ? "Loading districts..." : "Select Districts"}
                  isLoading={districtsLoading}
                  isDisabled={districtsLoading || !formData.state_ids || formData.state_ids.length === 0}
                  loadingMessage={() => (
                    <div className="d-flex align-items-center">
                      <Loader className="animate-spin me-2" size={16} />
                      Loading districts...
                    </div>
                  )}
                />
              </div>
            </div>
            {errors.district_ids && (
              <div className="text-danger small mt-1">
                {errors.district_ids}
              </div>
            )}
          </div>
        )}


        {/* Summary */}
        {isFormValid() && (
          <div className="col-12">
            <div className="card border-success bg-success bg-opacity-10">
              <div className="card-body">
                <h5 className="card-title text-success mb-3">
                  Selection Summary
                </h5>
                <div className="row">
                  <div className="col-md-4">
                    <strong>States:</strong>
                    <ul className="list-unstyled mt-1">
                      {formData.state_ids.map(stateId => {
                        const state = states.find(s => s.state_id === stateId);
                        return <li key={stateId} className="small">• {state?.name || stateId}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <strong>Districts:</strong>
                    <ul className="list-unstyled mt-1">
                      {formData.district_ids.map(districtId => {
                        const district = districts.find(d => d.district_id === districtId);
                        return <li key={districtId} className="small">• {district?.name || districtId}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between mt-5">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onPrev}
          disabled={loading}
        >
          <ChevronLeft size={18} className="me-1" />
          Back
        </button>
        <button
          type="submit"
          className="btn btn-success"
          disabled={loading || !isFormValid()}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              />
              Updating Locations...
            </>
          ) : (
            "Complete Registration"
          )}
        </button>
      </div>
    </form>
  );
};

export default LocationSelectionForm;