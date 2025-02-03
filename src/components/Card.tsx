import { FC, memo, ReactNode } from "react"

interface cardProp {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

const Card: FC<cardProp> = ({ title, icon, children }) => {
    return (
        <div className="card mb-2">
            <div className="card-header d-flex align-items-center">
                <div className="fs-4">{icon}</div>
                <h4 className="ms-2 mt-2">{title}</h4>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default memo(Card)
