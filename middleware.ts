export { auth as middleware } from "@/auth"

//protected routes
// *: zero or more
// +: one ore more
// ?: zero or one

export const config = {
    matcher: [
        '/issues/new', 
        '/issues/edit/:issueId+',
    ]
}
