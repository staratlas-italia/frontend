import { CogIcon } from "@heroicons/react/outline";
import { Button } from "~/components/controls/Button";
import { useModal } from "~/contexts/ModalContext";

export const Settings = () => {
  const { open } = useModal("wallet-modal");

  return (
    <Button size="small" bgColor="white" className="rounded-xl" onClick={open}>
      <CogIcon className="h-5 w-5" />
    </Button>
  );
  {
    /*
      <Menu as="div" className="relative inline-block text-left">
       <Flex className="h-full">
        <Menu.Button
          as={Button}
          size="small"
          bgColor="white"
          className="rounded-xl"
          onClick={() => console.log("ciao")}
        >
          <CogIcon className="h-5 w-5" />
        </Menu.Button>
      </Flex>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {ENDPOINTS.map(({ name, cluster }) => (
              <Menu.Item key={name}>
                {({ active }) => (
                  <Link
                    href={{
                      pathname,
                      query: { cluster },
                    }}
                    locale={locale}
                  >
                    <a>
                      <Text
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {name}
                      </Text>
                    </a>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu> */
  }
};
