'use client';

import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import { BaseContainer, FloatSwitchColorMode } from '_components/custom';
import { GlobalLoader } from '_components/custom/loader/Loader';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      h="100%"
      width="100%"
      ps={{ base: 5, md: '20px' }}
      pe={{ base: 5, md: '33px' }}
      pb={{ base: '1rem', xl: '4rem' }}
    >
      <Suspense fallback={<GlobalLoader loader />}>
        <BaseContainer p={0} border={'none'} mt={'30px'} position="relative">
          {children}
          <FloatSwitchColorMode />
        </BaseContainer>
      </Suspense>
    </Box>
  );
};
