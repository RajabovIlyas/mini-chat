import {useLoginForm} from "./login.hook.ts";

const Login = () => {
    const {errors, handleSubmit, onSubmit, register} = useLoginForm()

    return (
        <div className="flex items-center justify-center p-6 h-screen">
            <div className="w-80 rounded-2xl bg-gray-800">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 p-8">
                    <div className="pb-8">
                        <input
                            className="bg-slate-900 w-full rounded-lg border border-gray-300 text-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                            placeholder="Username" {...register('username')}/>
                        {errors.username && <p className="text-rose-500 h-0">{errors.username.message}</p>}
                    </div>
                    <button type="submit"
                            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login