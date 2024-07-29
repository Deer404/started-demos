"use client";

import { Button } from 'antd';
import { useRouter } from 'next/navigation'

export function TestButton() {
    const route = useRouter()
    return <Button type="primary" onClick={() => route.push("/") }>Button</Button>
}