import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  userType: "user" | "enterprise" | null
  walletAddress: string | null
  isConnected: boolean
  setUserType: (type: "user" | "enterprise" | null) => void
  setWalletAddress: (address: string | null) => void
  setIsConnected: (connected: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userType: null,
      walletAddress: null,
      isConnected: false,
      setUserType: (type) => set({ userType: type }),
      setWalletAddress: (address) => set({ walletAddress: address }),
      setIsConnected: (connected) => set({ isConnected: connected }),
    }),
    {
      name: "auth-storage",
    },
  ),
)

interface UserProfileState {
  profile: {
    name: string
    title: string
    experience: Array<{
      id: string
      company: string
      position: string
      startDate: string
      endDate: string
      verified: boolean
    }>
    education: Array<{
      id: string
      institution: string
      degree: string
      year: string
      verified: boolean
    }>
    skills: string[]
  }
  privacySettings: {
    workExperience: "public" | "restricted" | "private"
    education: "public" | "restricted" | "private"
    personalDetails: "public" | "restricted" | "private"
  }
  updateProfile: (profile: Partial<UserProfileState["profile"]>) => void
  updatePrivacySettings: (settings: Partial<UserProfileState["privacySettings"]>) => void
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      profile: {
        name: "",
        title: "",
        experience: [],
        education: [],
        skills: [],
      },
      privacySettings: {
        workExperience: "public",
        education: "restricted",
        personalDetails: "private",
      },
      updateProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
      updatePrivacySettings: (settings) =>
        set((state) => ({
          privacySettings: { ...state.privacySettings, ...settings },
        })),
    }),
    {
      name: "user-profile-storage",
    },
  ),
)

interface VerificationRequest {
  id: string
  candidateName: string
  candidateAddress: string
  requestType: string
  status: "pending" | "approved" | "declined" | "completed"
  requestedAt: string
  completedAt?: string
}

interface EnterpriseState {
  verificationRequests: VerificationRequest[]
  addVerificationRequest: (request: VerificationRequest) => void
  updateRequestStatus: (id: string, status: VerificationRequest["status"]) => void
}

export const useEnterpriseStore = create<EnterpriseState>()(
  persist(
    (set) => ({
      verificationRequests: [],
      addVerificationRequest: (request) =>
        set((state) => ({
          verificationRequests: [...state.verificationRequests, request],
        })),
      updateRequestStatus: (id, status) =>
        set((state) => ({
          verificationRequests: state.verificationRequests.map((req) => (req.id === id ? { ...req, status } : req)),
        })),
    }),
    {
      name: "enterprise-storage",
    },
  ),
)
