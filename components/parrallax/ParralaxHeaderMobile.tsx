import React from 'react';

const ParralaxHeaderMobile = () => (
  <div className="main-header mb-[33px]">
    <div className="layers">
      <div
        className="layer__header will_transform z-10 text-up-animation"
      >
        <div className="layers__title__mob font-popins font-black"><h1>Saga Plans</h1></div>
        <div className="layers__caption__mob"><h2 className="font-popins font-semibold">Geriausi eventai pajuryjė</h2></div>
      </div>
      <div
        className="layer"
        style={{
          backgroundImage: 'url(/ParollaxEffectOrgCoppy.jpg',
        }}
      />
    </div>
  </div>
);

export default ParralaxHeaderMobile;
