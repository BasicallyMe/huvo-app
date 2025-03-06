import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export default function ChannelInviteDialog({ showDialog, closeDialog }) {
  return (
    <Dialog
      open={showDialog}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeDialog}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white text-gray-950 shadow-md p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium">
              {`Your channel's ready!`}
            </DialogTitle>
            <p className="mt-2 text-sm/6 text-gray-500">
              {`You can either share this ID or the link below. Anyone with the ID or the link can join the conversation.`}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="py-1.5 px-2 text-sm border border-gray-300 text-gray-600 bg-gray-100 rounded-md flex-1">{`hubo.vercel.app/app/abcd-efg-hij`}</div>
              <Button className="w-fit">Copy Link</Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
