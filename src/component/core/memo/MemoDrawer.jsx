import { useEffect, useMemo } from "react";
import { useViewMemoHook } from "../../../hooks/useViewMemoHook";
import { useViewMemo } from "../../../services/API/memo";
import MemoApprovalHistory from "../../shared/createMemo/MemoApprovalHistory";
import DrawerSideTab from "../../shared/drawer/DrawerSideTab";
import ExpandedDrawer from "../../shared/drawer/ExpandedDrawer";
import SignMemo from "../../shared/signMemo/SignMemo";
import useCurrentUser from "../../../hooks/useCurrentUser";
import MemoNoteHistory from "../../shared/createMemo/MemoNoteHistory";

const MemoDrawer = () => {
  const {
    isOpen,
    handleCloseMemo,
    data: { memo, is_approve },
  } = useViewMemoHook();

  const { userData } = useCurrentUser();

  const {
    data: getMemoDetail,
    isPending: getMemoLoading,
    isError,
    refetch
  } = useViewMemo({
    memo_id: memo?.MEMO_ID,
  });


  useEffect(()=>{
       refetch()
  }, [refetch, memo?.MEMO_ID])


  const memoDetail = useMemo(() => getMemoDetail?.data, [getMemoDetail?.data]);
  const memoApprovers = useMemo(
    () => getMemoDetail?.approvers,
    [getMemoDetail?.approvers]
  );
  const memoNotes = useMemo(() => getMemoDetail?.notes, [getMemoDetail?.notes]);

  const selfMemo = memo?.INITIATOR === userData?.data?.STAFF_ID || !is_approve;



// console.log(getMemoDetail);



  return (
    <>
      <ExpandedDrawer isOpen={isOpen} onClose={handleCloseMemo} maxWidth={900}>
        <DrawerSideTab
          tabs={[
            {
              title: "Memo",
              component: (
                <SignMemo
                  selfMemo={selfMemo}
                  getMemoLoading={getMemoLoading}
                  isError={isError}
                  memoDetail={memoDetail}
                  memoApprovers={memoApprovers}
                  is_approve={is_approve}
                  memo={memo}
                />
              ),
            },
            { title: "Notes", component: <MemoNoteHistory memoNote={memoNotes}/> },
            {
              title: "Approval History",
              component: <MemoApprovalHistory memoApprovers={memoApprovers} />,
              header_text: "Memo Approval History",
            },
          ]}
        >
          <SignMemo memo={memo} />
        </DrawerSideTab>
      </ExpandedDrawer>
    </>
  );
};

export default MemoDrawer;
