import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const EmployeeModal = ({ isOpen, onClose, employee }) => {
  if (!employee) return null;

  return (
    <Transition appear show={isOpen} as={Fragment} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  {employee.Name}
                </Dialog.Title>
                <div className="mt-2 space-y-2">
                  <p><strong>Email:</strong> {employee.Email}</p>
                  <p><strong>Department:</strong> {employee.Department}</p>
                  <p><strong>Role:</strong> {employee.Role}</p>
                  <p><strong>Status:</strong> {employee.Status}</p>
                  <p><strong>Joining Date:</strong> {employee["Joining Date"]}</p>
                  <p><strong>Salary:</strong> ${employee.Salary}</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EmployeeModal;
