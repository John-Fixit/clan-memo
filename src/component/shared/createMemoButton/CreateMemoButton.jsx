import { useState } from 'react'
import ExpandedDrawer from '../drawer/ExpandedDrawer'
import DrawerSideTab from '../drawer/DrawerSideTab'
import MemoForm from '../createMemo/MemoForm'
import { Button, ConfigProvider } from 'antd'

const CreateMemoButton = () => {

    const [openDrawer, setOpenDrawer] = useState("");
    
      const handleOpenCreateMemo = () => {
        setOpenDrawer(true);
      };
      const handleCloseCreateMemo = () => {
        setOpenDrawer(false);
      };


  return (
    <>
    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#5A6ACF",
                        },
                        components: {
                          Button: {
                            defaultBg: "#5A6ACF",
                            colorText: "#D8D9DB",
                          },
                        },
                      }}
                    >
                      <Button type="primary" onClick={handleOpenCreateMemo}>Create Memo</Button>
                    </ConfigProvider>
    <ExpandedDrawer
        isOpen={openDrawer}
        onClose={handleCloseCreateMemo}
        maxWidth={720}
      >
        <DrawerSideTab
          tabs={[
            {
              title: "Create Memo",
              component: <MemoForm />,
            },
            // {
            //   title: "Approval",
            //   component: <MemoForm />,
            // },
          ]}
        >
          <MemoForm />
        </DrawerSideTab>
      </ExpandedDrawer>
    </>
  )
}

export default CreateMemoButton