import { useMutation } from "@tanstack/react-query"
import { createShortLink } from "../API/linkAPI"

export const useShortLink = () => {
    return useMutation({mutationFn: createShortLink})
}