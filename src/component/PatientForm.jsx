import { useState } from "react";
import Card from "./ui/Card";

function PatientForm({onSubmit, loading, onCancel}){
    const [form, setForm] = useState({
        name: "",
        age: "",
        email: "",
        phone: "",

    });

    function handleChange(e){
        const { name, value} = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
        ...form,
        age: Number(form.age),
        });

        setForm({
            name: "",
            age: "",
            email: "",
            phone: "",
        });
  }


    return (
        <Card>
        <div className="mb-5 flex items-center justify-between">
            <div>
            <h3 className="text-lg font-semibold text-white">Add Patient</h3>
            <p className="mt-1 text-sm text-slate-400">
                Create a new patient record in the system
            </p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                Name
            </label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter patient name"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
                required
            />
            </div>

            <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                Age
            </label>
            <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
                required
            />
            </div>

            <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
            </label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            />
            </div>

            <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                Phone
            </label>
            <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 pt-2">
            <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Saving..." : "Save Patient"}
            </button>

            <button
                type="button"
                onClick={onCancel}
                className="rounded-2xl border border-white/10 bg-white/6 px-5 py-3 font-medium text-slate-300 transition hover:bg-white/10"
            >
                Cancel
            </button>
            </div>
        </form>
        </Card>
    );
    }

    export default PatientForm;