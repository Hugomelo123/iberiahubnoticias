import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Noticias from "@/pages/noticias";
import Article from "@/pages/article";
import Admin from "@/pages/admin";

function Router() {
  return (
    <Switch>
      <Route path="/noticias" component={Noticias} />
      <Route path="/noticias/:slug" component={Article} />
      <Route path="/admin" component={Admin} />
      <Route path="/">
        <Redirect to="/noticias" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
