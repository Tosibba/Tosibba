import { useAccount, useChainId, useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { tsibContractAddresses } from "@/configs";
import { rusdAbi } from "@/configs/abi/rusd";

const useCheckAllowance = ({ spenderAddress,token }: { spenderAddress: Address,token:Address }) => {
    const { address } = useAccount();
    const chainId = useChainId()
    const { data: checkAllowanceContract, isSuccess, queryKey } = useReadContract({
        address: token,
        abi: rusdAbi,
        functionName: "allowance",
        args: [address as Address, spenderAddress],
        // query: {
        //     enabled: (
        //         address !== undefined &&
        //         spenderAddress !== undefined
        //     )
        // }
    });

    return {
        data: checkAllowanceContract,
        isSuccess: isSuccess,
        queryKey
    }

}

export default useCheckAllowance;