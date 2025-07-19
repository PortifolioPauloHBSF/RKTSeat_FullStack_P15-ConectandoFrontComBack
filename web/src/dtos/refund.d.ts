type RefundAPIPaginationResponse = {
    page: number;
    perPage: number;
    totalPages: number;
    totalRecords: number;
};

type RefundAPIRefundsResponse = {
    id: string;
    userId: string;
    name: string;
    category: CategoriesAPIEnum;
    amount: number;
    filename: string;
    updatedAt: string;
    user: {
        name: string;
    };
};

type RefundAPIResponse = {
    refunds: {
        pagination: RefundAPIPaginationResponse;
        refunds: [RefundAPIRefundsResponse];
    };
};
