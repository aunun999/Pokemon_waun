<template>
  <div>
    <form class="px-4 py-3">
      <div class="form-group">
        <label for="nameRegister">Name</label>
        <input type="email" class="form-control" id="nameRegister" placeholder="Put your name here">
      </div>
      <div class="form-group">
        <label for="emailRegister">Email address</label>
        <input type="email" class="form-control" id="emailRegister" placeholder="email@example.com">
      </div>
      <div class="form-group">
        <label for="passwordRegister">Password</label>
        <input type="password" class="form-control" id="passwordRegister" placeholder="Password">
      </div>
      <div class="form-group">
        <!-- <div class="form-check">
          <input type="checkbox" class="form-check-input" id="dropdownCheck">
          <label class="form-check-label" for="dropdownCheck">
            Remember me
          </label>
        </div> -->
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <div class="dropdown-divider"></div>
    <!-- <a class="dropdown-item" href="#">New around here? Sign up</a> -->
    <!-- <a class="dropdown-item" href="#">Forgot password?</a> -->
  </div>
</template>

<script>
export default {
  name: "RegisterPage"
}
</script>

<style>

</style>