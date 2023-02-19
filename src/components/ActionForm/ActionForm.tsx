import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Stack } from "react-bootstrap";
import * as yup from "yup";

import { AddableList } from "@components/AddableList";
import { Input } from "@components/Input";
import { setName } from "@components/ActionView/redux/reducer";

import { getBranches, setBranches } from "./redux";
import { ghRunners } from "./common/constants";
import { BranchRenderer, JobRenderer, StepRenderer } from "./components";

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
        btnLabel="Add Branch"
      >
        <Input
          id="name"
          placeholder="Enter branch name"
          schema={yup.string().required("Branch is required")}
        />
      </AddableList>

      <AddableList
        render={JobRenderer}
        list={branches}
        label="Jobs"
        isSetId
        onChange={branches => dispatch(setBranches(branches))}
        btnLabel="Add Job"
      >
        <Stack direction="horizontal" gap={2}>
          <Input
            id="name"
            placeholder="Enter job name"
            schema={yup.string().required("Branch is required")}
          />

          <Form.Select defaultValue="0">
            <option disabled>Choose...</option>

            {Object.entries(ghRunners).map(([type, label]) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </Form.Select>
        </Stack>

        <AddableList list={[]} render={StepRenderer} label="Steps" btnLabel="Add Step">
          <Input
            id="name"
            placeholder="Enter step name"
            schema={yup.string().required("Branch is required")}
          />
        </AddableList>
      </AddableList>
    </div>
  );
};
