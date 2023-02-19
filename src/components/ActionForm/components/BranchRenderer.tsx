import { ChangeEvent, FC } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { GhOnEventType } from "@/types/GhAction";
import { RendererItem } from "@components/AddableList/AddableList.props";
import { getActionOn } from "@components/ActionView/redux/selector";
import { removeOnValue, setOnValue } from "@components/ActionView/redux/reducer";

import { removeBranch } from "../redux/reducer";
import { Branch } from "../ActionForm.props";

const checkItems: Record<GhOnEventType, string> = { push: "Push", pull_request: "Pull Request" };
export const BranchRenderer: FC<RendererItem<Branch>> = ({ item: branch, index }) => {
  const dispatch = useDispatch();
  const ghActionOn = useSelector(getActionOn);

  const handler = (actionType: GhOnEventType) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const dispatchEvent = event.target.checked ? setOnValue : removeOnValue;
      dispatch(dispatchEvent([actionType, "branches", branch.id]));
    };
  };

  return (
    <Stack direction="horizontal">
      <span className="text-black text-decoration-none text-nowrap overflow-hidden text-truncate">
        {branch.name}
      </span>

      <Stack direction="horizontal" className="ms-auto" gap={4}>
        {Object.entries(checkItems).map(([name, label]) => (
          <Form.Check
            key={name}
            label={label}
            name={name}
            checked={ghActionOn[name as GhOnEventType]?.branches?.includes(branch.id) ?? false}
            onChange={handler(name as GhOnEventType)}
          />
        ))}
      </Stack>

      <Button
        className="ms-auto"
        variant="danger"
        onClick={() =>
          // @ts-ignore
          dispatch(removeBranch(index))
        }
      >
        Delete
      </Button>
    </Stack>
  );
};
