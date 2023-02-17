import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { AddableList } from "@components/AddableList";
import { Input } from "@components/Input";
import { setName } from "@components/ActionView/redux/reducer";

import { getBranches } from "./redux/selectors";
import { setBranches } from "./redux/reducer";
import { BranchRenderer } from "@components/ActionForm/components/BranchRenderer";

export const ActionForm: FC = () => {
  const dispatch = useDispatch();
  const branches = useSelector(getBranches);

  return (
    <div>
      <Input id="name" label="Name" onChange={event => dispatch(setName(event.target.value))} />

      <AddableList
        render={BranchRenderer}
        list={branches}
        label="Branches"
        isSetId
        onChange={branches => dispatch(setBranches(branches))}
      >
        <Input
          id="name"
          placeholder="Enter branch name"
          schema={yup.string().required("Branch is required")}
        />
      </AddableList>
    </div>
  );
};
