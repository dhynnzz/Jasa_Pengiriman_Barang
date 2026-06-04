<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = User::where('email', $request->email)->first();
            $token = $user->createToken('admin_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Invalid email or password'
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully'
        ]);
    }

    public function driverRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'required|string',
            'vehicle_type' => 'required|string',
            'plate_number' => 'required|string',
        ]);

        \Illuminate\Support\Facades\DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => \Illuminate\Support\Facades\Hash::make($request->password),
                'role' => 'driver'
            ]);

            \App\Models\Driver::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'vehicle_type' => $request->vehicle_type,
                'plate_number' => $request->plate_number,
                'status' => 'Aktif'
            ]);

            $token = $user->createToken('driver_token')->plainTextToken;

            \Illuminate\Support\Facades\DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Driver registered successfully',
                'token' => $token,
                'user' => $user
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to register driver: ' . $e->getMessage()
            ], 500);
        }
    }

    public function driverLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = User::where('email', $request->email)->first();
            
            if ($user->role !== 'driver') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Akses ditolak. Anda bukan kurir.'
                ], 403);
            }

            $token = $user->createToken('driver_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Email atau password salah.'
        ], 401);
    }

    public function customerRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => \Illuminate\Support\Facades\Hash::make($request->password),
            'role' => 'customer'
        ]);

        $token = $user->createToken('customer_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Akun pelanggan berhasil dibuat.',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function customerLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = User::where('email', $request->email)->first();
            
            if ($user->role !== 'customer') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Akses ditolak. Akun Anda bukan akun pelanggan reguler.'
                ], 403);
            }

            $token = $user->createToken('customer_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Login berhasil',
                'token' => $token,
                'user' => $user
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Email atau password salah.'
        ], 401);
    }
}
