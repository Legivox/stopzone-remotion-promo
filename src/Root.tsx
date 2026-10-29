import React from 'react';
import {Composition} from 'remotion';
import {StopzonePromo} from './StopzonePromo';

export const Root: React.FC = () => (
  <>
    <Composition
      id="StopzoneVertical"
      component={StopzonePromo}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{format: 'vertical' as const}}
    />
    <Composition
      id="StopzoneLandscape"
      component={StopzonePromo}
      durationInFrames={810}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{format: 'landscape' as const}}
    />
  </>
);