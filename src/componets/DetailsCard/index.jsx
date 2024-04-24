import React, { Fragment } from "react";

export const DetailsCard = (props) => {
  const { info = [] } = props;
  return (
    <div className="grid grid-cols-2 gap-6">
      {React.Children.toArray(
        info.map(({ heading, content, color, show = true }) => {
          return (
            <Fragment>
              {show && (
                <p className="flex flex-col items-start justify-center ">
                  <span className="text-base font-semibold text-center text-gray-600 ">
                    {heading}
                  </span>
                  <span className="text-base text-gray-700" style={{ color }}>
                    {content}
                  </span>
                </p>
              )}
            </Fragment>
          );
        })
      )}
    </div>
  );
};
