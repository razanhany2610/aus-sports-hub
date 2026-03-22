import java.io.IOException;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebFilter("/*")
public class AuthFilter implements Filter {
    
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpSession session = httpRequest.getSession(false);
        
        String requestURI = httpRequest.getRequestURI();
        
        if (requestURI.endsWith("login.html") || 
            requestURI.endsWith("register.jsp") ||
            requestURI.contains("/login") ||
            requestURI.contains("/register") ||
            requestURI.contains("/edit-profile") ||
            requestURI.endsWith(".css") ||
            requestURI.endsWith(".js") ||
            requestURI.endsWith(".jpg") ||
            requestURI.endsWith(".png")) {
            
            chain.doFilter(request, response);
            return;
        }
        
       
        boolean isLoggedIn = (session != null && session.getAttribute("user") != null);
        
        if (!isLoggedIn && isProtectedPage(requestURI)) {
            httpResponse.sendRedirect("login.html");
            return;
        }
        
        chain.doFilter(request, response);
    }
    
    private boolean isProtectedPage(String uri) {
        return uri.contains("/homepage/") ||
               uri.contains("/booking/") ||
               uri.contains("/events/") ||
               uri.contains("/profile/") ||
               uri.endsWith("/AUSSportsHub/");
    }
    
    public void init(FilterConfig fConfig) throws ServletException {}
    public void destroy() {}
}