import { createListCollection } from '@chakra-ui/react';
import { BaseStatsProps } from '_components/custom';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';
import { ENUM } from '_types/index';
import { IoIosRemove, IoMdAdd } from 'react-icons/io';

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Developer',
    department: 'IT',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Designer',
    department: 'HR',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Manager',
    department: 'HR',
    status: 'active',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    role: 'HR Specialist',
    department: 'HR',
    status: 'inactive',
    joinDate: '2022-12-05',
  },
];

const jobData = [
  { id: '1', label: 'Designer', value: 'DS' },
  { id: '2', label: 'Developper', value: 'DEV' },
  { id: '3', label: 'Manager', value: 'MN' },
  { id: '4', label: 'HR', value: 'HR' },
];

const officesData = [
  { id: '1', label: 'Unpixel', value: 'UP' },
  { id: '2', label: 'Horizon', value: 'HZ' },
  { id: '3', label: 'BVG', value: 'BVG' },
  { id: '4', label: 'AlkaaTech', value: 'AAT' },
];

const officesCollection = createListCollection({
  items: officesData,
});

const jobCollection = createListCollection({
  items: jobData,
});

const stats: BaseStatsProps[] = [
  {
    icon: <FiUsers size={16} color="white" />,
    title: 'Total Employees',
    color: 'red',
    percent: -0.1,
    isNumber: true,
    currency: ENUM.COMMON.Currency.XAF,
    value: 2500000000,
  },
  {
    icon: <FiTrendingUp size={16} color="white" />,
    title: 'Job Applicants',
    color: 'info.500',
    percent: 0.4,
    value: 1150,
  },
  {
    icon: <IoMdAdd size={16} color="white" />,
    title: 'New Employees',
    color: 'tertiary.500',
    percent: 0.1,
    value: 80,
  },
  {
    icon: <IoIosRemove size={16} color="white" />,
    title: 'Resigned Employees',
    color: 'red',
    percent: 0.5,
    value: 50,
  },
];

export {
  mockEmployees,
  jobData,
  officesCollection,
  jobCollection,
  stats,
  type Employee,
};
