import { Box, Flex } from '@chakra-ui/react';
import { BaseButton, FormSelect, FormTextInput } from '_components/custom';
import { CiSearch } from 'react-icons/ci';
import { jobCollection, officesCollection } from '_utils/data/employee';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const FilterEmployees = () => {
  const { t } = useTranslation();
  return (
    <Formik initialValues={{ search: '' }} onSubmit={() => {}}>
      {({ values, setFieldValue }) => (
        <Box>
          <Flex
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'stretch', lg: 'center' }}
            justifyContent="space-between"
            width={'full'}
            mb={'30px'}
            gap={4}
          >
            <Flex
              width={{ base: 'full', lg: '1/2' }}
              justifyContent={'flex-start'}
            >
              <FormTextInput
                name="search"
                placeholder={t('DASHBOARD.EMPLOYEE.SEARCH')}
                rightAccessory={<CiSearch size={20} />}
                value={values.search}
              />
            </Flex>

            <Flex
              width={'full'}
              flexDirection={{ base: 'column', sm: 'row' }}
              justifyContent={{ lg: 'flex-end' }}
              gap={3}
            >
              <FormSelect
                name="offices"
                listItems={officesCollection}
                setFieldValue={setFieldValue}
                placeholder={t('FORM.SELECT_OFFICES')}
              />
              <FormSelect
                name="languages"
                listItems={jobCollection}
                setFieldValue={setFieldValue}
                placeholder={t('FORM.SELECT_JOB')}
              />
              <FormSelect
                name="languages"
                listItems={jobCollection}
                setFieldValue={setFieldValue}
                placeholder={t('FORM.SELECT_JOB')}
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" gap={2}>
            <BaseButton colorType={'danger'} variant={'outline'}>
              {t('COMMON.CLEAR')}
            </BaseButton>
            <BaseButton colorType={'info'}>{t('COMMON.VALIDATE')}</BaseButton>
          </Flex>
        </Box>
      )}
    </Formik>
  );
};
