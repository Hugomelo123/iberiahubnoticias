import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Noticias from "@/pages/noticias";
import Article from "@/pages/article";
import Admin from "@/pages/admin";
import Login from "@/pages/login";
import Agenda from "@/pages/agenda";
import Maintenance from "@/pages/maintenance";
import Privacidade from "@/pages/legal/privacidade";
import Termos from "@/pages/legal/termos";
import Redacao from "@/pages/legal/redacao";
import MaintenanceChecker from "@/components/MaintenanceChecker";

function PrivateRoute({ component: Component, ...rest }: any) {
  const isAuth = sessionStorage.getItem('isEditor') === 'true';
  return (
    <Route {...rest}>
      {isAuth ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
}

function Router() {
  return (
    <MaintenanceChecker>
      <Switch>
        <Route path="/noticias" component={Noticias} />
        <Route path="/noticias/:slug" component={Article} />
        <Route path="/agenda" component={Agenda} />
        <Route path="/login" component={Login} />
        <Route path="/maintenance" component={Maintenance} />
        <Route path="/privacidade" component={Privacidade} />
        <Route path="/termos" component={Termos} />
        <Route path="/redacao" component={Redacao} />
        <PrivateRoute path="/admin" component={Admin} />
        <Route path="/">
          <Redirect to="/noticias" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </MaintenanceChecker>
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
