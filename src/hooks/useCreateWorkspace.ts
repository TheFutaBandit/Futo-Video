import { CreateWorkspace } from "@/actions/workspace"
import { useMutation } from "@tanstack/react-query"
import useZodForm from "./useZodForm"
import { workspaceSchema } from "@/components/forms/workspace-form/schema"
import { useMutationData } from "./useMutationData"

export const useCreateWorkspace = () => {
    const {mutate, isPending} = useMutationData(
        ['create-workspace'],
        (data: { name: string }) => CreateWorkspace(data.name),
        'user-workspace'
    )

    const { errors, onFormSubmit, register} = useZodForm(workspaceSchema, mutate);

    return { errors, onFormSubmit, register, isPending }
}