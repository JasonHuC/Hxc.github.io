import AdminNav from '@/app/admin/gallery/AdminNav';

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    return (
        <div className="mt-4 space-y-4">
            <AdminNav/>
            {children}
        </div>
    );
}