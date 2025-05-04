import { useEffect, useState } from "react";
import { getRedirectResult, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function FirebaseAuth() {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        
        if (result) {
          // The signed-in user info
          const user = result.user;
          
          // This gives you a Google Access Token or Facebook Access Token
          // You can use it to access Google APIs or Facebook APIs
          let credential;
          if (result.providerId === GoogleAuthProvider.PROVIDER_ID) {
            credential = GoogleAuthProvider.credentialFromResult(result);
          } else if (result.providerId === FacebookAuthProvider.PROVIDER_ID) {
            credential = FacebookAuthProvider.credentialFromResult(result);
          }
          
          // Show success message
          toast({
            title: "Successfully signed in",
            description: `Welcome, ${user.displayName || user.email}!`,
          });
        }
      } catch (error) {
        // Handle Errors here
        const errorCode = (error as any).code;
        const errorMessage = (error as any).message;
        
        toast({
          title: "Authentication Error",
          description: errorMessage || "Failed to authenticate. Please try again.",
          variant: "destructive",
        });
        
        console.error("Auth error:", errorCode, errorMessage);
      } finally {
        setLoading(false);
      }
    };

    handleRedirectResult();
  }, [toast]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  return null;
}