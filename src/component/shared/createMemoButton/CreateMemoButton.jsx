
import { Button, ConfigProvider } from "antd";
import CreateMemoDrawer from "./CreateMemoDrawer";
import { useHandleMemo } from "../../../hooks/useHandleMemo";

const CreateMemoButton = () => {


  const {handleOpenCreateMemo} = useHandleMemo()

  


  





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
        <Button type="primary" size="large" onClick={handleOpenCreateMemo}>
          Create Memo
        </Button>
      </ConfigProvider>
      <CreateMemoDrawer />

    </>
  );
};

export default CreateMemoButton;
