import { useMutation, useQuery } from "@tanstack/react-query"
import { deletLink, getAllLinks } from "../API/linkAPI"

const LinkList = () => {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['links'],
        queryFn:  getAllLinks,

    })

    const deleteMutate = useMutation({
        mutationFn: deletLink,
        onSuccess: () => refetch()
    })
  return (
    <ul>
        {data?.map((item)=>(
            <li key={item.shortId}>
                <a href={item.originURL}>{item.originURL}</a>
                <button onClick={() => deleteMutate.mutate(item.shortId)}>Delete</button>
            </li>
        ))}
    </ul>
  )
}

export default LinkList