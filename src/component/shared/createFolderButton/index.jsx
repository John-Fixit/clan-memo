import { useState } from 'react'
import ExpandedDrawer from '../drawer/ExpandedDrawer'
import DrawerSideTab from '../drawer/DrawerSideTab'
import { Button, ConfigProvider } from 'antd'
import FolderForm from './FolderForm'

const CreateFolderButton = () => {

    const [openDrawer, setOpenDrawer] = useState("");
    
      const handleOpenCreateFolder = () => {
        setOpenDrawer(true);
      };
      const handleCloseCreateFolder = () => {
        setOpenDrawer(false);
      };


  return (
    <>
    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#5A6ACF",
                        },
                      }}
                    >
                      <Button size='large' type='default' onClick={handleOpenCreateFolder}>Create Folder</Button>
                    </ConfigProvider>
    <ExpandedDrawer
        isOpen={openDrawer}
        onClose={handleCloseCreateFolder}
        maxWidth={720}
      >
        <DrawerSideTab
          tabs={[
            {
              title: "Create Folder",
              component: <FolderForm />,
            },
          ]}
        >
          <FolderForm />
        </DrawerSideTab>
      </ExpandedDrawer>
    </>
  )
}

export default CreateFolderButton