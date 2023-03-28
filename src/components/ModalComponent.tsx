import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function ModalComponent({ component, name }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className="bg-[#80b500] font-semibold text-md p-2 mx-1  hover:text-white rounded-md "
      >
        {name}
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{component}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
